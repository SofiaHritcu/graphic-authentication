import { shallowMount } from "@vue/test-utils";
import LandingView from "@/views/landing-view.vue";
import "regenerator-runtime/runtime";

describe("Landing View", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallowMount(LandingView, {
      mocks: {
        $router: {
          push: jest.fn(),
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
    describe("handleButtonClick", () => {
      it("should execute router push with the right parameters", async () => {
        expect.assertions(1);
        const spyRouterPush = jest.spyOn(wrapper.vm.$router, "push");

        await wrapper.vm.handleButtonClick("ga-login");

        expect(spyRouterPush).toHaveBeenCalledWith({ name: "ga-login" });
      });
    });
  });
});
