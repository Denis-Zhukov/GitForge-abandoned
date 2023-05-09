import {motion} from "framer-motion";
import {appear, leftSlide, rightSlide} from "../../utils/animations";
import s from "./style.module.scss";

export const Info = () => {

    return <>
        <motion.h1
            initial="hidden" whileInView="visible" variants={appear}
            className={s.title}
        >Git<span className={s.orange}>Forge</span></motion.h1>

        <motion.div initial="hidden" whileInView="visible" className={s.furnace}>
            <motion.div variants={leftSlide}>
                <img src="/images/furnace.png" alt="furnace"/>
            </motion.div>
            <motion.p variants={rightSlide}>GitForge is a Git hosting service that provides
                developers with a
                reliable and secure platform to
                manage their code repositories, collaborate with team members, and deploy applications. The
                service
                is designed to simplify the Git workflow and provide advanced features to make development
                faster
                and more efficient.
            </motion.p>
        </motion.div>

        <motion.h2
            initial="hidden" whileInView="visible" variants={appear}
            className={s.subtitle}
        >Some of the key features of Git<span className={s.orange}>Forge</span>
        </motion.h2>

        <motion.div initial="hidden" whileInView="visible" className={s.anvil}>
            <motion.p variants={leftSlide}><span
                className={s.orange}>Unlimited code</span> hosting with Git
                repositories, making it easy to
                manage your projects and
                collaborate
                with team members track changes, and manage issues.
            </motion.p>
            <motion.div variants={rightSlide}>
                <img src="/images/anvil.png" alt="anvil"/>
            </motion.div>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" className={s.stool}>
            <motion.div variants={leftSlide}>
                <img src="/images/stool.png" alt="stool"/>
            </motion.div>
            <motion.p variants={leftSlide}>GitForge is built with security in mind, providing
                advanced security
                features such as <span
                    className={s.orange}>two-factor authentication</span>, access control,
                and encryption to keep your code safe
            </motion.p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" className={s.tools}>
            <motion.p variants={leftSlide}> GitForge provides project <span
                className={s.orange}>management</span> tools that enable you to
                track progress, manage tasks, and
                plan releases.
            </motion.p>
            <motion.div variants={rightSlide}><img src="/images/tools.png" alt="tools"/></motion.div>
        </motion.div>

        <motion.p initial="hidden" whileInView="visible" variants={appear}>To get started with GitForge, simply
            create
            an account and create a new repository. You can then
            clone the repository to your local machine and start working on your code. GitForge supports all Git
            commands and workflows, so you can use it just like any other Git hosting service.
        </motion.p>
        <motion.p initial="hidden" whileInView="visible" variants={appear}>GitForge offers both free and paid
            plans, with the paid plans providing
            additional features such as
            increased storage, unlimited collaborators, and advanced security features. Whether you're a solo
            developer or part of a large team, GitForge provides a powerful and easy-to-use platform for
            managing your code and collaborating with others.
        </motion.p>
    </>
}