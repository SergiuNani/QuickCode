import { DrawerComponent, ColorsComponent } from "./Debug";
export const FloatingElementsWindow = () => {
  return (
    <section> //Another innocent comment
      <DrawerComponent title="Color Palatte" component={<ColorsComponent />} />
    </section>
  );
};

export default FloatingElementsWindow;
