import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;


const posts = [{
    date: (new Date().getFullYear() - 1),
    title: "The Evolution of Hacking",
    text: "Hacking has come a long way from its humble beginnings, transforming from a niche activity into a global phenomenon that shapes our digital world. To understand the current landscape of cybersecurity and cyber threats, it's essential to trace the history of hacking, from the early days of phone phreaking to today's sophisticated cyber espionage. The roots of hacking can be traced back to the 1960s and 1970s with the advent of phone phreaking. Phone phreaking involved manipulating telephone systems to make free calls or explore the inner workings of the network. One of the most famous phone phreakers was John Draper, also known as Captain Crunch, who discovered that a toy whistle given away in cereal boxes could mimic the tones used by AT&T’s phone system."
}, {
    date: new Date().getFullYear(),
    title: "Ethical Hacking",
    text: "In a world where cyber threats are constantly evolving, ethical hacking has emerged as a crucial defense mechanism. Ethical hackers, often referred to as white-hat hackers, play a vital role in protecting our digital infrastructure. This blog post delves into the world of ethical hacking, exploring the processes involved in penetration testing, real-life scenarios where ethical hacking has made a difference, and how you can pursue a career in this field. Ethical hackers are cybersecurity professionals who use their skills to identify and fix security vulnerabilities before malicious hackers can exploit them. Unlike their black-hat counterparts, ethical hackers work with the permission of system owners to improve security. Their work is essential for preventing data breaches, protecting sensitive information, and ensuring the overall integrity of digital systems. There are numerous examples where ethical hacking has played a crucial role in preventing major security breaches."

}, {
    date: new Date().getFullYear(),
    title: "The Role of Ethical Hackers",
    text: "Ethical hackers are cybersecurity professionals who use their skills to identify and fix security vulnerabilities before malicious hackers can exploit them. Unlike their black-hat counterparts, ethical hackers work with the permission of system owners to improve security. Their work is essential for preventing data breaches, protecting sensitive information, and ensuring the overall integrity of digital systems."
}];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.render("index.ejs", { posts: posts, post: null });
});


app.get("/new-post", (req, res) => {
    res.render("new-post.ejs")
});
app.post("/new-post", (req, res) => {
    if (req.body.pTitle === null || req.body.pText === null || req.body.pTitle.trim() === '' || req.body.pText.trim() === '') {
        res.render("new-post.ejs")
    } else {
        const data = { date: new Date().getFullYear(), title: req.body.pTitle, text: req.body.pText };
        posts.push(data);
        res.redirect('/');
    }
});
app.post('/delete', (req, res) => {
    const title = req.body.pTitle;
    const index = posts.findIndex(post => post.title === title);

    if (index !== -1) {
        posts.splice(index, 1);
    }
    res.render("index.ejs", { posts: posts, post: null });
});

app.post('/edit', (req, res) => {
    const title = req.body.pTitle;
    const index = posts.findIndex(post => post.title === title);
    console.log(index);
    res.render("update-post.ejs", { posts: posts, post: posts[index] });
    posts.splice(index, 1)

});

app.post('/update-post', (req, res) => {
    if (req.body.pTitle === null || req.body.pText === null || req.body.pTitle.trim() === '' || req.body.pText.trim() === '') {
        res.render("new-post.ejs")
    } else {
        const data = { date: new Date().getFullYear(), title: req.body.pTitle, text: req.body.pText };
        posts.push(data);
        res.redirect('/');
    }
});
app.get("/about", (req, res) => {
    res.render("about.ejs")
})

app.listen(port, () => {
    console.log(`Listening on port ${port}.`)
});

