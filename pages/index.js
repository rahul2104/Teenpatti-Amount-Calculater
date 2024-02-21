import Layout from "../layout/main";
import {useEffect} from "react";
import {useRouter} from "next/router";

export default function Home() {
    const router = useRouter();
    useEffect(() => {
        let accessToken = sessionStorage.getItem('accessToken')
        if (accessToken) {
            router.push('/dashboard', undefined, { shallow: true })
        }else{
            router.push('/auth/login', undefined, { shallow: true })
        }
    }, [])

  return (
      <Layout notHeader={true}>
        <div className="wrapper_404">
          {/*<div className="main_404">*/}
          {/*  <img src="../images/Page-Not-Found.png" className="img_404" />*/}
          {/*  <img src="../images/404.png" className="img_404" />*/}
          {/*</div>*/}
        </div>
      </Layout>
  );
}
