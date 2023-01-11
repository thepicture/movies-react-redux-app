import { RouterProvider } from "react-router-dom";

import { Header, BaseContainer } from "@/components";
import { router } from "@/providers";

export const SharedLayout = () => {
  return (
    <BaseContainer>
      <Header />
      <RouterProvider router={router} />
    </BaseContainer>
  );
};
