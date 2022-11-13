import { useAppDispatch, useAppSelector } from "src/store";

// components
import Snack from "src/components/common/snack";

import AppTemplate from "src/components/layout/templates/AppTemplate";
import AppFooter from "src/components/layout/footers/AppFooter";
import InfinitySpin from "src/components/common/load/InfinitySpin";

export default function HomePage() {
  const { id, user_id, name } = useAppSelector((store) => store.auth);

  return (
    <AppTemplate>
      <section className="w-full h-full">
        <section className="w-full h-full max-w-xl mx-auto px-3">
          <main className="pt-8">
            {new Array(10).fill(0).map((v, i) => (
              <Snack key={i} />
            ))}
          </main>
          <InfinitySpin />
          <AppFooter />
        </section>
      </section>
    </AppTemplate>
  );
}
