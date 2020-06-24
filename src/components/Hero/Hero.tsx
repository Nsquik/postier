import React, { ReactNode } from "react";
import "./Hero.scss";
import { ReactComponent as Wave } from "../../media/waves.svg";
import Select from "./Select";

export interface Props {
  children?: ReactNode;
}

interface StaticComponents {
  Select: React.FC<any>;
}

interface ComponentWithStaticMethod<TProps> extends React.FC<TProps> {
  staticMethod?: (value: string) => void;
  Select: React.FC<any>;
}

const Hero: ComponentWithStaticMethod<Props> = ({ children }) => {
  return (
    <header className="hero">
      <section className="hero__content">
        <Wave className="wave" />
        <div className="hero__title">
          posTier
          <div className="hero__subtitle">post and comment</div>
        </div>
        <hr style={{ width: "50%" }}></hr>
        <section className="hero__select">{children}</section>
      </section>
    </header>
  );
};

Hero.Select = Select;

export default Hero;
