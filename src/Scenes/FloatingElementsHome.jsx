import { DrawerComponent, ColorsComponent } from "./Debug";
export const FloatingElementsWindow = () => {
  return (
    <section>
      <DrawerComponent title="Color Palatte" component={<ColorsComponent />} />
    </section>
  );
};

export default FloatingElementsWindow;
