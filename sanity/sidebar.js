import S from "@sanity/desk-tool/structure-builder"
import { MdHome as icon } from "react-icons/md"

export default function Sidebar() {
  return S.list()
    .title(`Alice's Quiz`)
    .items([
      S.listItem()
        .title("Settings")
        .icon(icon)
        .child(
          S.editor()
            .schemaType("setting")
            .documentId("settings")
            .title("Settings")
        ),
      ...S.documentTypeListItems().filter((item) => item.getId() !== "setting"),
    ])
}
