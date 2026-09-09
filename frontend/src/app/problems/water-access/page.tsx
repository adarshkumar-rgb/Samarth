import ProblemPage from "../[slug]/page";

export default function WaterAccessPage() {
  return <ProblemPage params={Promise.resolve({ slug: "water-access" })} />;
}
