import React, { useEffect } from "react";
import { getRepositoryIssues } from "./api/main";
import BasicTextFields from "./components/TextField";

const App: React.FC = () => {
    useEffect(() => {
        const res = getRepositoryIssues({ owner: "microsoft", repo: "typescript" });
        console.log(res);
    }, []);

    return (
        <div>
            <BasicTextFields />
        </div>
    );
};

export default App;
