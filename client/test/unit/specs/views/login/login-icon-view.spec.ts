import { shallowMount } from "@vue/test-utils";
import "regenerator-runtime/runtime";
import LoginIconView from "@/views/login/login-icon-view.vue";
import mockStore from "../../store/mocked-store-modules";
import { iconsCategoriesMock } from "../../store/modules/icons/mock-data/mock";

describe("Login Icon View", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallowMount(LoginIconView, {
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
  });

  describe("methods", () => {
    describe("handleBackBtnClick", () => {
      it("should call router push with the corresponding parameters", async () => {
        expect.assertions(1);
        const spyRouterPush = jest.spyOn(wrapper.vm.$router, "push");

        await wrapper.vm.handleBackBtnClick();

        expect(spyRouterPush).toHaveBeenCalledWith({ name: "ga-login" });
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
      const iconItem = iconsCategoriesMock[0].icons[0];

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
    describe("submitLogin", () => {
      it("should call fetchLogin with the user input", async () => {
        expect.assertions(1);

        const spyOnFetchLogin = jest.spyOn(wrapper.vm, "fetchLogin");
        await wrapper.setData({
          userName: "test",
          passAfterTransformation: "test",
        });

        await wrapper.vm.submitLogin();

        expect(spyOnFetchLogin).toHaveBeenCalledWith({
          userName: "test",
          password: "test",
        });
      });
    });
    describe("handleLoginBtnClick", () => {
      it("should submit login if the form is valid", () => {
        wrapper.vm.$refs.loginFormRef.validate = jest.fn(() => true);
        const spySubmitLogin = jest.spyOn(wrapper.vm, "submitLogin");

        wrapper.vm.handleLoginBtnClick();

        expect(spySubmitLogin).toHaveBeenCalled();
      });
      it("should reset the form if it is not valid", () => {
        wrapper.vm.$refs.loginFormRef.validate = jest.fn(() => false);
        wrapper.vm.$refs.loginFormRef.reset = jest.fn();
        const spyFormReset = jest.spyOn(
          wrapper.vm.$refs.loginFormRef,
          "reset"
        );

        wrapper.vm.handleLoginBtnClick();

        expect(wrapper.vm.loginErrorShows).toBe(true);
        expect(spyFormReset).toHaveBeenCalled();
      });
    });
  });

  describe("computed", () => {
    describe("iconsScrollSize", () => {
      it("should return 400 when being on larger viewports", () => {
        wrapper.vm.$vuetify.breakpoint.name = "lg";
        expect(wrapper.vm.iconsScrollSize).toEqual(400);
      });
      it("should return 200 when being on smaller viewports", () => {
        wrapper.vm.$vuetify.breakpoint.name = "lg";
        expect(wrapper.vm.iconsScrollSize).toEqual(400);
      });
    });
    describe("onLargerViewPort", () => {
      it("should return true for lg or xl breakpoint", () => {
        wrapper.vm.$vuetify.breakpoint.name = "lg";
        expect(wrapper.vm.onLargerViewPort).toEqual(true);
      });
    });
  });
});
