import { act, fireEvent, render, renderHook } from "@testing-library/react";
import useEventListener from ".";

describe("useEventListener", () => {
  it("测试监听点击事件", async () => {
    const { getByText } = render(<div>el</div>);
    const el = getByText("el");

    let count: number = 0;
    const onClick = () => {
      count++;
    };

    const { rerender, unmount } = renderHook(() => useEventListener("click", onClick, el));

    document.body.click(); // 点击 document应该无效
    expect(count).toEqual(0);

    act(() => fireEvent.click(el)); // 点击 container count + 1
    expect(count).toEqual(1);

    rerender(); // 重新渲染
    act(() => fireEvent.click(el)); // 点击 container count + 1
    expect(count).toEqual(2);

    unmount(); // 卸载
    act(() => fireEvent.click(el)); // 点击 container 应该无效
    expect(count).toEqual(2);
  });
});
