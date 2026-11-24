import content from "../content.js";

export default function Footer() {
  return (
    <footer className="mt-4 border-t-2 border-dashed border-tim/30 px-5 py-8 text-center">
      <p className="mx-auto max-w-xl text-xs leading-relaxed text-muc/70">{content.footer}</p>
    </footer>
  );
}
