import { Page } from "../../components";
import "./Error404.style.scss";

function Error404() {
  return (
    <Page>
      <h1>Error 404: Not Found</h1>
      <div>
        <p>
          The requested page cannot be found. If you entered the URL manually,
          check your spelling and try again.
        </p>
      </div>
      <div>
        <p>
          If you found this page while navigating the site normally, report
          this issue to the dev team.
        </p>
      </div>
      <div className="cute-img">
        <img src="./resources/cat-dance.gif" />
      </div>
    </Page>
  )
}

export default Error404;
