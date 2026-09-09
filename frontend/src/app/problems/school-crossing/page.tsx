import ProblemPage from "../[slug]/page";

export default function SchoolCrossingPage() {
  return <ProblemPage params={Promise.resolve({ slug: "school-crossing" })} />;
}
