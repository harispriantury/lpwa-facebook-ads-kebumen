import { render } from "preact";
import { App } from "./app.tsx";
import "primereact/resources/primereact.min.css"; // Gaya umum PrimeReact
import "primeicons/primeicons.css"; // Ikon PrimeIcons

render(<App />, document.getElementById("app")!);
