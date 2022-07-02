import { createLocalVue, shallowMount } from "@vue/test-utils";
import LoginView from "@/views/login/login-view.vue";
import "regenerator-runtime/runtime";

describe("Login View", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallowMount(LoginView, {
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
    describe("handleAuthCardClick", () => {
      it("should execute router push with the right parameters", async () => {
        expect.assertions(1);
        const spyRouterPush = jest.spyOn(wrapper.vm.$router, "push");

        await wrapper.vm.handleAuthCardClick("ga-login");

        expect(spyRouterPush).toHaveBeenCalledWith({ name: "ga-login" });
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
});
