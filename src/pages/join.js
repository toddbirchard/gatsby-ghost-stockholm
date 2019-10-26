import React from 'react'
import { Link } from 'gatsby'
import { Layout } from '../components/common'


const introText = "We’re flattered to have you as a fan. How would you like to join the squad? It might sound crazy, but there’s a good chance we’d love to have you!"

const JoinUs = () => (
    <Layout template="page-template" hasSidebar={true}>

      <article class="post-content page-content">
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
        <form className="needs-validation" id="msform" accept-charset="UTF-8" action="https://getform.io/f/ce75696d-0ee2-4475-8a8f-a26da6267917" method="POST" netlify="true">
          <fieldset className="active">
            <h3>The Boring Stuff</h3>
            <p>Tell us about yourself by letting your browser auto-fill these obligatory fields.</p>
            <div className="input-field-group">
              <label for="application_name">{`Full Name (required)`}</label>
              <input id="application_name" className="form-control" maxlength="20" name="fullname" type="text" required="" />
            </div>
            <div className="input-field-group">
              <label for="application_email">{`Email (required)`}</label>
              <input id="application_email" placeholder="coolguy@yahoo.com" className="form-control" maxlength="30" name="email" type="email" required="" onblur="" />
            </div>
            <div className="input-field-group">
              <label for="application_username">{`Nickname/Call Sign/Gangsta Rap Persona`}</label>
              <input id="application_username" placeholder="Mavrick" className="form-control" maxlength="30" name="nickname" type="text" onblur="" />
            </div>
            <div className="input-field-group">
              <label for="application_expertise">{`What are your areas of expertise? (required)`}</label>
              <input id="application_expertise" placeholder="Java, ASP, Perl" className="form-control" maxlength="100" name="expertise" type="text" required="" onblur="" />
            </div>
          </fieldset>

          <fieldset>
            <h3>{`The Juicy Stuff`}</h3>
            <p id="application_description">{`Before we can let you into our temple, we need to make sure you're literate first. Please provide a writing sample where you've explained something technical, perferrably in the vein of Data Science and Engineering.`}</p>
            <div className="input-field-group">
              <label for="application_sample">{`Writing sample (required)`}</label>
              <textarea className="form-control" aria-describedby="application_sample" id="application_submission_sample" name="writing_sample" required=""></textarea>
            </div>
          </fieldset>

          <fieldset>
            <h3>{`The Blow-Our-Minds Stuff (Optional)`}</h3>
            <p id="application_notes">{`If youd like to provide any of the information below to sweeten the deal, have it!`}</p>
            <div className="input-field-group">
              <label for="application_website">{`Website`}</label>
              <input className="form-control" placeholder="http://yoursite.com" id="application_website" maxlength="40" name="website" type="text" onblur="" />
            </div>
            <div className="input-field-group">
              <label for="application_blog">{`Blog`}</label>
              <input className="form-control" id="application_blog" placeholder="https://medium.com/You" maxlength="40" name="blog" type="text" onblur="" />
            </div>
            <div className="input-field-group">
              <label for="application_github">{`Github`}</label>
              <input className="form-control" id="application_github" placeholder="https://github.com/nerdinator" maxlength="40" name="github" type="text" onblur="" />
            </div>
            <div className="input-field-group">
              <label for="application_twitter">{`Twitter`}</label>
              <input className="form-control" id="application_twitter" placeholder="https://twitter.com/YourHandle" maxlength="40" name="twitter" type="text" onblur="" />
            </div>
          </fieldset>
          <button type="submit" label="submit" className="btn btn-primary">{`Submit`}</button>
        </form>
    </article>
    </Layout>
)

export default JoinUs