import { createLocalVue, shallowMount } from "@vue/test-utils";
import SignUpView from "@/views/signup/signup-view.vue";
import "regenerator-runtime/runtime";

describe("SignUp View", () => {
  let wrapper: any;

  beforeEach(() => {
    // {
    //   mocks: {
    //     $router: {
    //       push: jest.fn(),
    //     },
    //     $vuetify: {
    //       breakpoint: {
    //         name: "",
    //       },
    //     },
    //   },
    // }
    wrapper = shallowMount(SignUpView, {
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

  describe("methods", () => {
    describe("handleSignupCardClick", () => {
      it("should execute router push with the right parameters", async () => {
        expect.assertions(1);
        const spyRouterPush = jest.spyOn(wrapper.vm.$router, "push");

        await wrapper.vm.handleSignupCardClick("ga-signup");

        expect(spyRouterPush).toHaveBeenCalledWith({ name: "ga-signup" });
      });
    });
    describe("handleAuthCardClick", () => {
      it("should execute router push with the right parameters", async () => {
        expect.assertions(1);
        const spyRouterPush = jest.spyOn(wrapper.vm.$router, "push");

        await wrapper.vm.handleAuthCardClick("ga-signup");

        expect(spyRouterPush).toHaveBeenCalledWith({ name: "ga-signup" });
      });
    });
    describe("handleIPassClick", () => {
      it("should execute router push with welcome route name", async () => {
        expect.assertions(1);
        const spyRouterPush = jest.spyOn(wrapper.vm.$router, "push");

        await wrapper.vm.handleIPassClick();

        expect(spyRouterPush).toHaveBeenCalledWith({ name: "ga-welcome" });
      });
    });
  });

  describe("computed", () => {
    describe("avatarSize", () => {
      it("should return 100 when being on smaller viewports", () => {
        wrapper.vm.$vuetify.breakpoint.name = "xs";
        expect(wrapper.vm.avatarSize).toEqual(100);
      });
      it("should return 150 when being on larger viewports", () => {
        wrapper.vm.$vuetify.breakpoint.name = "lg";
        expect(wrapper.vm.avatarSize).toEqual(150);
      });
    });
  });
});
