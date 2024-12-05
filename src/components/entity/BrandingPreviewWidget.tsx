import { getRuntime } from "@yext/pages/util";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { FaChevronDown } from "react-icons/fa";
import { BrowserRouter, useSearchParams } from "react-router-dom";
import { createCtx } from "src/common/createCtx";
import c from "classnames";

const BrandingPreviewWidget = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (
    !isClient ||
    getRuntime().name !== "browser" ||
    typeof window === undefined
  ) {
    return null;
  }

  const currentUrl = new URL(window.location.href);

  if (!currentUrl.searchParams.get("xYextBranding")) {
    return null;
  }

  return (
    <BrowserRouter>
      <BrandCustomizer />
    </BrowserRouter>
  );
};

("use client");

function BrandCustomizer() {
  const { setLogo } = useBrandingProvider();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isExpanded, setIsExpanded] = useState(true);
  const [primaryColor, setPrimaryColor] = useState("");
  const [secondaryColor, setSecondaryColor] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [_, setLogoFile] = useState<File | null>(null);

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const objectUrl = URL.createObjectURL(file);
      setLogoUrl(objectUrl);
    }
  };

  const handleUpdate = () => {
    document.documentElement.style.setProperty("--brand-primary", primaryColor);
    document.documentElement.style.setProperty(
      "--brand-secondary",
      secondaryColor
    );
    if (logoUrl) {
      setLogo(logoUrl);
    }

    // window.localStorage.setItem("primaryColor", primaryColor);
    // window.localStorage.setItem("secondaryColor", secondaryColor);
    // window.localStorage.setItem("logoUrl", logoUrl);

    const params = new URLSearchParams(window.location.search);
    params.set("primaryColor", primaryColor.replace("#", ""));
    params.set("secondaryColor", secondaryColor.replace("#", ""));
    if (logoUrl) {
      params.set("logoUrl", logoUrl);
    }
    setSearchParams(params);
  };

  useEffect(() => {
    const initialPrimary = searchParams.get("primaryColor")
      ? `#${searchParams.get("primaryColor")}`
      : getComputedStyle(document.documentElement).getPropertyValue(
          "--brand-primary"
        ) ?? "";
    const initialSecondary = searchParams.get("secondaryColor")
      ? `#${searchParams.get("secondaryColor")}`
      : getComputedStyle(document.documentElement).getPropertyValue(
          "--brand-primary"
        ) ?? "";
    const initialLogoUrl = searchParams.get("logoUrl") ?? "";

    setPrimaryColor(initialPrimary);
    setSecondaryColor(initialSecondary);
    setLogoUrl(initialLogoUrl);

    document.documentElement.style.setProperty(
      "--brand-primary",
      initialPrimary
    );
    document.documentElement.style.setProperty(
      "--brand-secondary",
      initialSecondary
    );
    if (initialLogoUrl) {
      setLogo(initialLogoUrl);
    }
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg transition-all duration-300 ease-in-out z-50">
      <div className="container mx-auto p-4">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <FaChevronDown
            className={c("h-4 w-4", { "rotate-180": !isExpanded })}
          />
        </button>
        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end mt-8">
            <div>
              <label
                htmlFor="primaryColor"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Primary Color
              </label>
              <div className="flex mt-1">
                <div className="relative">
                  <input
                    type="color"
                    id="primaryColorPicker"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="sr-only"
                  />
                  <label
                    htmlFor="primaryColorPicker"
                    className="w-10 h-10 rounded border border-gray-300 cursor-pointer flex items-center justify-center"
                    style={{ backgroundColor: primaryColor }}
                  ></label>
                </div>
                <input
                  type="text"
                  id="primaryColor"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="flex-1 ml-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-neutral-500 focus:border-neutral-500"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="secondaryColor"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Secondary Color
              </label>
              <div className="flex mt-1">
                <div className="relative">
                  <input
                    type="color"
                    id="secondaryColorPicker"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="sr-only"
                  />
                  <label
                    htmlFor="secondaryColorPicker"
                    className="w-10 h-10 rounded border border-gray-300 cursor-pointer flex items-center justify-center"
                    style={{ backgroundColor: secondaryColor }}
                  ></label>
                </div>
                <input
                  type="text"
                  id="secondaryColor"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="flex-1 ml-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-neutral-500 focus:border-neutral-500"
                />
              </div>
            </div>
            <div>
              {logoUrl && (
                <div className="mt-2">
                  <img
                    src={logoUrl}
                    alt="Logo preview"
                    width={100}
                    height={50}
                    className="object-contain"
                  />
                </div>
              )}
              <label
                htmlFor="logoUrl"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Logo
              </label>
              <div className="flex mt-1">
                <input
                  type="text"
                  id="logoUrl"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="https://example.com/logo.png"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-neutral-500 focus:border-neutral-500"
                />
                <label
                  htmlFor="logoFile"
                  className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-neutral-600 hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 cursor-pointer"
                >
                  Upload
                </label>
                <input
                  type="file"
                  id="logoFile"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="sr-only"
                />
              </div>
            </div>
            <button
              className="md:col-span-3 mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-neutral-600 hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500"
              onClick={handleUpdate}
            >
              Apply Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

interface BrandingProvider {
  logo: string;
  setLogo: Dispatch<SetStateAction<string>>;
}

const [useBrandingProvider, BrandingProvider] = createCtx<BrandingProvider>(
  "Attempted to call useTemplateData outside of TemplateDataProvider"
);

export default BrandingPreviewWidget;
export { useBrandingProvider, BrandingProvider };
