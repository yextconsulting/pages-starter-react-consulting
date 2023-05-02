import type { TemplateRenderProps, LocationProfile } from "src/types/entities";
import { getRuntime } from "@yext/pages/util";

import {
  PDFViewer,
  Text,
  Document,
  Page,
  StyleSheet,
  View,
} from "@react-pdf/renderer";

interface EntityLayoutProps {
  data: TemplateRenderProps<LocationProfile>;
}

const EntityLayout = ({ data }: EntityLayoutProps) => {
  const docs = Array(100)
    .fill(data.document)
    .map((loc, i) => ({ ...loc, id: i, name: `Test Location ${i}` }));

  const runtime = getRuntime();

  return (
    <div className="">
      {!runtime.isServerSide && (
        <PDFViewer className="w-full h-[700px]">
          <ExportDoc docs={docs} />
        </PDFViewer>
      )}
    </div>
  );
};

const styles = StyleSheet.create({
  tocentry: { margin: 10 },
  doctor: {
    border: "2px solid black",
    textAlign: "center",
    margin: 30,
    padding: 30,
  },
});

export function ExportDoc(props: { docs: any[] }) {
  const { docs } = props;
  const pageNumMap: Record<number, any> = {};

  return (
    <Document>
      <Page>
        <Text>Table of Contents</Text>
        {docs.map((doc) => {
          console.log(pageNumMap);
          console.log(doc.id, pageNumMap[doc.id]);
          return (
            <View style={styles.tocentry}>
              <Text
                wrap={false}
                render={({ pageNumber }) => {
                  return `${doc.name} - Page ${
                    pageNumMap[doc.id] || "unknown"
                  }`;
                }}
              ></Text>
            </View>
          );
        })}
      </Page>
      <Page>
        {docs.map((doc) => {
          return (
            <View
              style={styles.doctor}
              wrap={false}
              render={({ pageNumber }) => {
                pageNumMap[doc.id] = pageNumber;
                return <Text>Hello {doc.name}</Text>;
              }}
            ></View>
          );
        })}
      </Page>
    </Document>
  );
}

export default EntityLayout;
