import {Navbar} from "../../components/Navbar";
import {usePageTitle} from "../../hooks";
import s from "./style.module.scss";

export const Main = () => {
    usePageTitle("GitForge");

    return (
        <div className={s.wrapper}>
            <Navbar logo="logo192.png"/>
            <main>
                <h1 className={s.title}>Git<span className={s.orange}>Forge</span></h1>
                <p>GitForge is a Git hosting service that provides developers with a reliable and secure platform to
                    manage their code repositories, collaborate with team members, and deploy applications. The service
                    is designed to simplify the Git workflow and provide advanced features to make development faster
                    and more efficient.</p>
                <h2>Some of the key features of GitForge</h2>
                <p>Unlimited code hosting with Git repositories, making it easy to manage your projects and collaborate
                    with team members track changes, and manage issues.</p>
                <p>GitForge is built with security in mind, providing advanced security features such as two-factor
                    authentication, access control, and encryption to keep your code safe</p>
                <p>GitForge provides project management tools that enable you to track progress, manage tasks, and plan
                    releases.</p>
                <p>To get started with GitForge, simply create an account and create a new repository. You can then
                    clone the repository to your local machine and start working on your code. GitForge supports all Git
                    commands and workflows, so you can use it just like any other Git hosting service.
                </p>
                <p>GitForge offers both free and paid plans, with the paid plans providing additional features such as
                    increased storage, unlimited collaborators, and advanced security features. Whether you're a solo
                    developer or part of a large team, GitForge provides a powerful and easy-to-use platform for
                    managing your code and collaborating with others.</p>
            </main>
        </div>
    )
}