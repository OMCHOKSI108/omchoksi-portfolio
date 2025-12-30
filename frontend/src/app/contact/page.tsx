import { Suspense } from "react";
import ContactPageClient from "./ContactPageClient";

export default function ContactPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactPageClient />
    </Suspense>
  );
}
