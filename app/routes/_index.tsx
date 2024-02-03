import {json, MetaFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";


export const loader = async ({context}) => {
  console.log('context is', context)
  return json({
    posts: [
      {
        slug: 'my-first-post',
        title: 'My First Post',
      },
      {
        slug: '90s-mixtape',
        title: 'A Mixtape I Made Just For You',
      },
    ],
  })
}


export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
    const { posts } = useLoaderData<typeof loader>()
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
