// ... other declarations if any ...

declare module "*.svg" {
	import React = require("react");
	export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
	const src: string;
	export default src;
}

// 만약 @svgr/webpack 설정에서 `exportAsDefault` 옵션을 사용하지 않는다면,
// 또는 SVG를 컴포넌트로 직접 import 하려면 (e.g., import Logo from './logo.svg';)
// 아래와 같이 정의할 수 있습니다.
// declare module "*.svg" {
//   const content: React.FC<React.SVGProps<SVGSVGElement>>;
//   export default content;
// }
