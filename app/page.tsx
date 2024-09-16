import Link from "next/link";

export default function Home() {
    return (
    <div className="App">
        <h1>Welcome to test project!</h1>
        <Link href={'/user'}>
            Press the link to see users list!
        </Link>
    </div>
  );
}
