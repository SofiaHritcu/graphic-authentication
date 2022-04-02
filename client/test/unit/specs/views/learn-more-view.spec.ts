import { shallowMount } from "@vue/test-utils";
import LearnMoreView from "@/views/learn-more-view.vue";

describe("LearnMore View", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallowMount(LearnMoreView);
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
