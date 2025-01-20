import { type SVGAttributes } from "react";
import IcLoader  from "../../assets/loader.svg?react";
import IcEmail  from "../../assets/email.svg?react";
import  IcKey  from "../../assets/key.svg?react";

export interface IconProps extends SVGAttributes<unknown> {
  name: string;
}

const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  switch (name) {
    case "ic_loader":
      return <IcLoader {...props} />;
    case "ic_email":
      return <IcEmail {...props} />;
    case "ic_key":
      return <IcKey {...props} />;
    default:
      throw new Error(
        `Specify the correct icon name in the Icon component! '${name}' name not found!`
      );
  }
};

export default Icon;
