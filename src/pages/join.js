import React from 'react'
import { Layout } from '../components/common'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const JoinUs = () => (
    <Layout template="page-template" hasSidebar={false}>

        <article className="post-content page-content">
            <h1>{`Join Us`}</h1>
            <p>{`We’re flattered to have you as a fan. How would you like to join the squad? It might sound crazy, but there’s a good chance we’d love to have you!`}</p>
            <h3>{`Why Write for Hackers & Slackers?`}</h3>
            <p>{`None of us are getting paid from writing free tutorials, but the of benefits to contributing to the greater communities of data science and software engineering often outweigh small amounts of money.`}</p>
            <p>{`Hackers and Slackers is viewed by thousands of people worldwide every day! Many of those people turn out to be friends, recruiters at big tech companies, or publishers looking for book deals. We’re not promising good fortune, but there are a lot of reasons why H+S might be a good first home for you:`}</p>
            <ul>
                <li>{`Everything you write is your own. You aren’t limited to making content exclusive here.`}</li>
                <li>{`We’ve been lucky in the way that search engines have treated us. When most people come across our site, they usually stop searching because they find what they’re looking for. As a result, content published here tends to become visible quickly.`}</li>
                <li>{`We’ll do the work of dressing up your posts for you! We provide artwork for all posts, and even build custom modules for posts which need extra love.`}</li>
                <li>{`You’re safe here. No topic is too small to cover, and you’ll never have to worry about creating content that’s “good enough” here (some of our most popular posts are about basic topics)! No matter what happens, we’re all here to make each other better with input.`}</li>
            </ul>
            <form method="POST" netlify="true" data-netlify="true" netlify-honeypot="phone-number" action="/applied">
                <fieldset className="active">
                    <h3>The Boring Stuff</h3>
                    <p>Tell us about yourself by letting your browser auto-fill these obligatory fields.</p>
                    <div className="input-field-group">
                        <label htmlFor="application_name">{`Full Name (required)`}</label>
                        <input id="application_name" className="form-control" maxLength="20" name="fullname" type="text" required="" />
                    </div>
                    <div className="input-field-group">
                        <label htmlFor="application_email">{`Email (required)`}</label>
                        <input id="application_email" placeholder="coolguy@yahoo.com" className="form-control" maxLength="30" name="email" type="email" required="" onBlur="" />
                    </div>
                    <div className="input-field-group">
                        <label htmlFor="application_username">{`Nickname/Call Sign/Gangsta Rap Persona`}</label>
                        <input id="application_username" placeholder="Mavrick" className="form-control" maxLength="30" name="nickname" type="text" onBlur="" />
                    </div>
                    <div className="input-field-group">
                        <label htmlFor="application_expertise">{`What are your areas of expertise? (required)`}</label>
                        <input id="application_expertise" placeholder="Java, ASP, Perl" className="form-control" maxLength="100" name="expertise" type="text" required="" onBlur="" />
                    </div>
                    <input className="phone-number" type="phone" name="phone-number" placeholder="Your phone number" style={{ display: `none` }} autoComplete="off" />
                </fieldset>

                <fieldset>
                    <h3>{`The Juicy Stuff`}</h3>
                    <p id="application_description">{`Before we can let you into our temple, we need to make sure you're literate first. Please provide a writing sample where you've explained something technical, perferrably in the vein of Data Science and Engineering.`}</p>
                    <div className="input-field-group">
                        <label htmlFor="application_sample">{`Writing sample (required)`}</label>
                        <textarea className="form-control" aria-describedby="application_sample" id="application_submission_sample" name="writing_sample" required=""></textarea>
                    </div>
                </fieldset>

                <fieldset>
                    <h3>{`The Blow-Our-Minds Stuff (Optional)`}</h3>
                    <p id="application_notes">{`If youd like to provide any of the information below to sweeten the deal, have it!`}</p>
                    <div className="input-field-group">
                        <label htmlFor="application_website"><FontAwesomeIcon icon={[`far`, `globe`]} size="xs" /> {`Website`}</label>
                        <input className="form-control" placeholder="http://yoursite.com" id="application_website" maxLength="40" name="website" type="text" onBlur="" />
                    </div>
                    <div className="input-field-group">
                        <label htmlFor="application_blog"><FontAwesomeIcon icon={[`fab`, `medium`]} size="xs" /> {`Blog`}</label>
                        <input className="form-control" id="application_blog" placeholder="https://medium.com/You" maxLength="40" name="blog" type="text" onBlur="" />
                    </div>
                    <div className="input-field-group">
                        <label htmlFor="application_github"><FontAwesomeIcon icon={[`fab`, `github`]} size="xs" /> {`Github`}</label>
                        <input className="form-control" id="application_github" placeholder="https://github.com/nerdinator" maxLength="40" name="github" type="text" onBlur="" />
                    </div>
                    <div className="input-field-group">
                        <label htmlFor="application_twitter"><FontAwesomeIcon icon={[`fab`, `twitter`]} size="xs" /> {`Twitter`}</label>
                        <input className="form-control" id="application_twitter" placeholder="https://twitter.com/YourHandle" maxLength="40" name="twitter" type="text" onBlur="" />
                    </div>
                </fieldset>
                <button type="submit" label="submit" className="btn btn-primary">{`Submit`}</button>
            </form>
        </article>
    </Layout>
)

export default JoinUs
