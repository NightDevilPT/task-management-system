import "../styles/globals.css";

import LayoutFrame from "@/components/LayoutFrame";
import { store } from "@/redux/store";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<LayoutFrame>
				<Component {...pageProps} />
			</LayoutFrame>
		</Provider>
	);
}
