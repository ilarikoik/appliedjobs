export default function getRightIcon(status: string) {
  let icon = "";
  switch (status) {
    case "No answer":
      icon = "⏳";
      break;
    case "Interview":
      icon = "🧑‍💼";
      break;
    case "Answered":
      icon = "📬";
      break;
    case "Declined":
      icon = "❌";
      break;
    case "Job offer":
      icon = "💼";
      break;
    case "ei_vastattu":
      icon = "⏳";
      break;
    case "haastattelu":
      icon = "🧑‍💼";
      break;
  }
  return icon;
}
