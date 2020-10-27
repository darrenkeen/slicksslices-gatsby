import { useEffect, useState } from 'react';

const gql = String.raw;

export default function useLatestData() {
  const [hotSlices, setHotSlices] = useState();
  const [slicemasters, setSlicemasters] = useState();

  useEffect(() => {
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              slicemaster {
                name
                _id
                image {
                  asset {
                    url
                    metadata {
                      lqip
                    }
                  }
                }
              }
              hotSlices {
                name
                _id
                image {
                  asset {
                    url
                    metadata {
                      lqip
                    }
                  }
                }
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        setSlicemasters(response.data.StoreSettings.slicemaster);
        setHotSlices(response.data.StoreSettings.hotSlices);
      })
      .catch((err) => console.log(err));
  }, []);

  return { hotSlices, slicemasters };
}
