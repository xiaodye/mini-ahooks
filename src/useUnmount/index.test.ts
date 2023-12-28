import { renderHook } from "@testing-library/react";
import useUnmount from "./index";

describe("useUnmount", () => {
  it("useUnmount should work", async () => {
    const fn = jest.fn();
    const { rerender, unmount } = renderHook(() => useUnmount(fn));

    expect(fn).toHaveBeenCalledTimes(0);

    rerender();
    expect(fn).toHaveBeenCalledTimes(0);

    unmount();
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
