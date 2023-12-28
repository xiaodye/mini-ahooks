import { render, fireEvent, renderHook, act } from "@testing-library/react";
import useHover from ".";

describe("useHover", () => {
  it("测试Hover", () => {
    const { getByText } = render(<div>Hover1</div>);
    const { result } = renderHook(() => useHover(getByText("Hover1")));

    // void 的目的是告诉fireEvent方法返回的是undefined
    act(() => fireEvent.mouseEnter(getByText("Hover1")));
    expect(result.current).toBe(true);

    act(() => fireEvent.mouseLeave(getByText("Hover1")));
    expect(result.current).toBe(false);
  });

  it("测试功能", () => {
    const { getByText } = render(<div>Hover2</div>);
    let count = 0;
    let flag = false;

    const { result } = renderHook(() =>
      useHover(getByText("Hover2"), {
        onEnter: () => {
          count++;
        },
        onChange: (isFlag) => {
          flag = isFlag;
        },
        onLeave: () => {
          count++;
        },
      })
    );

    expect(result.current).toBe(false);

    act(() => fireEvent.mouseEnter(getByText("Hover2")));
    expect(result.current).toBe(true);
    expect(count).toBe(1);
    expect(flag).toBe(true);

    act(() => fireEvent.mouseLeave(getByText("Hover2")));
    expect(result.current).toBe(false);
    expect(count).toBe(2);
    expect(flag).toBe(false);
  });
});
