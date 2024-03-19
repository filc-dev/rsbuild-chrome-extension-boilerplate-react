import { createRoot } from "react-dom/client";
import { DevTools } from "./devtools";

const root = createRoot(document.querySelector("#root")!);

root.render(<DevTools />);
