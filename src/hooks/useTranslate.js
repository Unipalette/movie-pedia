import { useLocale } from "../contexts/LocaleContext";
const dict = {
  ko: {
    "confirm button": "확인",
    "cancel button": "취소",
    "edit button": "수정",
    "delete button": "삭제",
  },
  en: {
    "confirm button": "OK",
    "cancel button": "Cancel",
    "edit button": "Edit",
    "delete button": "Delete",
  },
};

function useTranslate() {
  const locale = useLocale();
  z;
  const translate = (key) => dict[locale][key] || "";
  return translate;
}
export default useTranslate;
