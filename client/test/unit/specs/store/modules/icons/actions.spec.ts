import { fetchIconsCategories } from "@/store/modules/icons/actions";
import { iconsCategoriesMock } from "./mock-data/mock";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("actions", () => {
  describe("fetchIconsCategories", () => {
    describe("with a valid response", () => {
      it("should commit the setIconsCategories mutation with a valid payload", async () => {
        expect.assertions(1);
        var mock = new MockAdapter(axios);
        const data = { success: true, iconsCategories: iconsCategoriesMock };
        mock.onGet("/ga/api/icons/icons_categories").reply(200, data);

        const commit = jest.fn();
        await (fetchIconsCategories as Function)({ commit });

        expect(commit).toBeCalledWith(
          "setIconsCategories",
          iconsCategoriesMock
        );
      });
    });
  });
});
