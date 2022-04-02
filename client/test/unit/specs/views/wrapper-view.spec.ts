import { shallowMount } from "@vue/test-utils";
import WrapperView from "@/views/wrapper-view.vue";


describe("Wrapper View", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallowMount(WrapperView);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  describe("snapshot", () => {
    it("should match snapshot", () => {
      expect(wrapper.vm.$el).toMatchSnapshot();
    });
  });
});
