import { getRuntime } from "@yext/pages/util";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { createCtx } from "src/common/createCtx";

const BrandingPreviewWidget = () => {
  if (getRuntime().name !== "browser" || typeof window === undefined) {
    return null;
  }

  const currentUrl = new URL(window.location.href);

  if (!currentUrl.searchParams.get("xYextBranding")) {
    return null;
  }

  return <BrandingPreviewWidgetInternal />;
};

const BrandingPreviewWidgetInternal = () => {
  const { setLogo } = useBrandingProvider();
  const [primary, setPrimary] = useState("#3498db");
  const [secondary, setSecondary] = useState("#3498db");
  const [internalLogo, setInternalLogo] = useState("");

  const handlePrimary = (newColor: string) => {
    setPrimary(newColor);
  };

  const handleSecondary = (newColor: string) => {
    setSecondary(newColor);
  };

  const handleLogo = (url: string) => {
    setInternalLogo(url);
  };

  const handleClick = () => {
    document.documentElement.style.setProperty("--brand-primary", primary);
    document.documentElement.style.setProperty("--brand-secondary", secondary);
    setLogo(internalLogo);
  };

  useEffect(() => {
    const rootStyle = getComputedStyle(document.documentElement);
    const initialPrimary = rootStyle.getPropertyValue("--brand-primary").trim();
    const initialSecondary = rootStyle
      .getPropertyValue("--brand-secondary")
      .trim();
    setPrimary(initialPrimary);
    setSecondary(initialSecondary);
  }, []);

  return (
    <div className="fixed bottom-4 left-1/2 bg-white shadow-2xl drop-shadow-2xl rounded-lg px-8 py-4 border border-black">
      <div className="flex gap-x-4">
        <div className="flex gap-x-1">
          <div>Logo</div>
          <input
            type="text"
            value={internalLogo}
            onChange={(e) => handleLogo(e.target.value)}
            className="border border-black"
          />
          {internalLogo && (
            <div>
              <img src={internalLogo} alt="" />
            </div>
          )}
        </div>
        <div className="flex gap-x-1">
          <div>Primary</div>
          <input
            type="color"
            value={primary}
            onChange={(e) => handlePrimary(e.target.value)}
            className="bg-transparent"
          />
        </div>
        <div className="flex gap-x-1">
          <div>Secondary</div>
          <input
            type="color"
            value={secondary}
            onChange={(e) => handleSecondary(e.target.value)}
            className="bg-transparent"
          />
        </div>
      </div>
      <div className="flex justify-center mt-3">
        <button
          onClick={handleClick}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          Update
        </button>
      </div>
    </div>
  );
};

interface BrandingProvider {
  logo: string;
  setLogo: Dispatch<SetStateAction<string>>;
}

const [useBrandingProvider, BrandingProvider] = createCtx<BrandingProvider>(
  "Attempted to call useTemplateData outside of TemplateDataProvider"
);

export default BrandingPreviewWidget;
export { useBrandingProvider, BrandingProvider };
