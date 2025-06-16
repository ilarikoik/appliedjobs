export default function getRightIcon(status: string) {
  let icon = "";
  switch (status) {
    case "Sent":
      icon = "✔️";
      break;
    case "ei_vastattu":
    case "No answer":
      icon = "⏳";
      break;
    case "haastattelu":
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
    default:
      icon = "✔️";
  }
  return icon;
}
