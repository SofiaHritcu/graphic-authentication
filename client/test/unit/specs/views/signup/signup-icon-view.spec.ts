import { shallowMount } from "@vue/test-utils";
import "regenerator-runtime/runtime";
import SignUpIconView from "@/views/signup/signup-icon-view.vue";
import mockStore from "../../store/mocked-store-modules";
import {
  iconCategoriesSortedMock,
  iconsCategoriesMock,
} from "../../store/modules/icons/mock-data/mock";

describe("Login Icon View", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallowMount(SignUpIconView, {
      store: mockStore,
      data: {
        userNameRules: [],
        iconPassCount: 6,
        iconPasses: [],
        iconPassLastCompletedIndex: 0,
        loginFormRef: "loginFormRef",
      },
      computed: {
        onLargerViewPort: () => true,
      },
      mocks: {
        $router: {
          push: jest.fn(),
        },
        $vuetify: {
          breakpoint: {
            name: "",
          },
        },
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  describe("snapshot", () => {
    it("should match snapshot", () => {
      expect(wrapper.vm.$el).toMatchSnapshot();
    });
  });

  describe("data rules", () => {
    describe("nameRules", () => {
      it("should return a message if the name is not defined", () => {
        var nameRules = wrapper.vm.nameRules;
        expect(nameRules[0]("")).toBe("name is required");
      });
      it("should return a message if the name is longer than 20 characters", () => {
        var nameRules = wrapper.vm.nameRules;
        expect(nameRules[1]("abcdefghijklmnopqrstuvwxyz")).toBe(
          "the name must be less than 20 characters"
        );
      });
    });
    describe("userNameRules", () => {
      it("should return a message if the userName is not defined", () => {
        var userNameRules = wrapper.vm.userNameRules;
        expect(userNameRules[0]("")).toBe("username is required");
      });
      it("should return a message if the userName is longer than 10 characters", () => {
        var userNameRules = wrapper.vm.userNameRules;
        expect(userNameRules[1]("abcdefghijklm")).toBe(
          "username must be less than 10 characters"
        );
      });
    });
    describe("emailRules", () => {
      it("should return a message if the email is not defined", () => {
        var emailRules = wrapper.vm.emailRules;
        expect(emailRules[0]("")).toBe("e-mail is required");
      });
      it("should return a message if the email is not in a correct format", () => {
        var emailRules = wrapper.vm.emailRules;
        expect(emailRules[1]("abcdefghijklm")).toBe("e-mail must be valid");
      });
    });
  });

  describe("methods", () => {
    describe("handleBackBtnClick", () => {
      it("should call router push with the corresponding parameters", async () => {
        expect.assertions(1);
        const spyRouterPush = jest.spyOn(wrapper.vm.$router, "push");

        await wrapper.vm.handleBackBtnClick();

        expect(spyRouterPush).toHaveBeenCalledWith({ name: "ga-signup" });
      });
    });
    describe("handleIconCategoryChange", () => {
      it("should make the logo invisible and set the current icons to the corresponding value", async () => {
        expect.assertions(2);

        await wrapper.setData({
          logoVisible: true,
        });

        wrapper.vm.handleIconCategoryChange(iconsCategoriesMock[0].category);

        expect(wrapper.vm.logoVisible).toBe(false);
        expect(wrapper.vm.iconItems).toEqual(iconsCategoriesMock[0].icons);
      });
    });
    describe("handleIconClick", () => {
      it("should make the logo invisible and update the icon passes if the pass is not long enough", async () => {
        expect.assertions(2);

        await wrapper.setData({
          logoVisible: true,
        });
        const iconItem = iconsCategoriesMock[0].icons[0];

        wrapper.vm.handleIconClick(iconItem);

        expect(wrapper.vm.iconPasses).toEqual({
          "0": iconItem,
          "1": "",
          "2": "",
          "3": "",
          "4": "",
          "5": "",
        });
        expect(wrapper.vm.iconPassLastCompletedIndex).toBe(1);
      });
    });
    it("should check the password strength if the pass is complete", async () => {
      expect.assertions(3);

      await wrapper.setData({
        logoVisible: true,
        iconPassLastCompletedIndex: 5,
        iconPasses: {
          "0": "a",
          "1": "a",
          "2": "a",
          "3": "a",
          "4": "a",
          "5": "",
        },
      });
      const iconItem = iconCategoriesSortedMock[0].icons[0];

      wrapper.vm.handleIconClick(iconItem);

      expect(wrapper.vm.iconPasses).toEqual({
        "0": "a",
        "1": "a",
        "2": "a",
        "3": "a",
        "4": "a",
        "5": iconItem,
      });
      expect(wrapper.vm.iconPassLastCompletedIndex).toBe(6);
      expect(wrapper.vm.iconPassStrengthInterval).toStrictEqual({
        lower: 0,
        upper: 100,
        qualifying: "bad level of security",
        color: "#C62828",
        vColor: "red",
        vOpacity: "darken-3",
      });
    });
    describe("handleClearBtnClick", () => {
      it("should reset all data props related to the pass", () => {
        const spySetUpDefaultIconsPass = jest.spyOn(
          wrapper.vm,
          "setUpDefaultIconsPass"
        );
        wrapper.vm.handleClearBtnClick();

        expect(wrapper.vm.userName).toBe("");
        expect(wrapper.vm.iconPasses).toStrictEqual(["", "", "", "", "", ""]);
        expect(wrapper.vm.iconPassLastCompletedIndex).toBe(0);
        expect(spySetUpDefaultIconsPass).toHaveBeenCalled();
      });
    });
    describe("submitSignup", () => {
      it("should call fetchSignup with the user input", async () => {
        expect.assertions(1);

        const spyOnFetchSignup = jest.spyOn(wrapper.vm, "fetchSignup");
        await wrapper.setData({
          name: "nameTest",
          userName: "userNameTest",
          email: "email@test.com",
          passAfterTransformation: "passwordTest",
        });

        await wrapper.vm.submitSignup();

        expect(spyOnFetchSignup).toHaveBeenCalledWith({
          name: "nameTest",
          userName: "userNameTest",
          email: "email@test.com",
          password: "passwordTest",
          confirmPassword: "passwordTest",
        });
      });
    });
    describe("handleSignupBtnClick", () => {
      it("should submit signup if the form is valid", () => {
        wrapper.vm.$refs.signupFormRef.validate = jest.fn(() => true);
        const spySubmitSignup = jest.spyOn(wrapper.vm, "submitSignup");

        wrapper.vm.handleSignupBtnClick();

        expect(spySubmitSignup).toHaveBeenCalled();
      });
      it("should reset the form if it is not valid", () => {
        wrapper.vm.$refs.signupFormRef.validate = jest.fn(() => false);
        wrapper.vm.$refs.signupFormRef.reset = jest.fn();
        const spyFormReset = jest.spyOn(
          wrapper.vm.$refs.signupFormRef,
          "reset"
        );

        wrapper.vm.handleSignupBtnClick();

        expect(wrapper.vm.signupErrorShows).toBe(true);
        expect(spyFormReset).toHaveBeenCalled();
      });
    });
  });

  //   describe("computed", () => {
  //     describe("iconsScrollSize", () => {
  //       it("should return 400 when being on larger viewports", () => {
  //         wrapper.vm.$vuetify.breakpoint.name = "lg";
  //         expect(wrapper.vm.iconsScrollSize).toEqual(400);
  //       });
  //       it("should return 200 when being on smaller viewports", () => {
  //         wrapper.vm.$vuetify.breakpoint.name = "lg";
  //         expect(wrapper.vm.iconsScrollSize).toEqual(400);
  //       });
  //     });
  //     describe("onLargerViewPort", () => {
  //       it("should return true for lg or xl breakpoint", () => {
  //         wrapper.vm.$vuetify.breakpoint.name = "lg";
  //         expect(wrapper.vm.onLargerViewPort).toEqual(true);
  //       });
  //     });
});
