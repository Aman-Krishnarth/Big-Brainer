import React from "react";

function LandingPageContent() {
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            {/* Funny/Rude Welcome Heading */}
            <h1 className="text-4xl font-bold text-center text-gray-800">
                A Safe Haven for Your Random Curiosity
            </h1>

            {/* Quote Section */}
            <div className="text-center mt-2">
                <p className="text-xl font-semibold text-gray-600 italic">
                    "Somewhere, something incredible is waiting to be known."
                </p>
                <p className="text-lg font-medium text-gray-700">
                    — Carl Sagan
                </p>
                <p className="text-base text-gray-600 mt-1">
                    (Congrats, you now have a fancy quote to throw into
                    conversations and pretend you're deep.)
                </p>
            </div>

            {/* Motivation Section */}
            <div
                className="bg-gray-100 p-6 rounded-xl shadow-md flex flex-col md:flex-row items-center gap-2"
                data-aos="fade-right"
                data-aos-duration="1000"
            >
                <div className="md:w-1/2 text-lg text-gray-700 font-medium ">
                    <h2 className="text-2xl font-bold mb-3">
                        Be Smart, Not Just a Specialist
                    </h2>
                    <p>
                        Ever met someone who can talk about anything and
                        thought, “Damn, I wanna be like that”? Yeah, that’s the
                        goal. Knowing random cool stuff makes you interesting,
                        but let’s be honest, no one wakes up thinking, “Let me
                        casually study geology today.” Even if you do, where do
                        you even start? We get it—you want quick, digestible
                        knowledge, not a PhD. And that’s exactly why we’re here.
                    </p>
                </div>
                <div className="md:w-1/2 flex justify-center mt-4 md:mt-0 order-2 md:order-2">
                    <img
                        src="https://imgs.search.brave.com/8ss-E1FmRZyg6Hp60szI2hVnPTmiOHDzakIvRYv7vWc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9tb3RpdmF0aW9u/LXN0cmF0ZWd5LWNv/YWNoaW5nLXRyYWlu/aW5nLXN1Y2Nlc3Mt/c3VjY2Vzc2Z1bC1i/dXNpbmVzcy1jb25j/ZXB0LW5vdGUtcGFw/ZXJfNzcwMTIzLTEz/NTYuanBnP3NlbXQ9/YWlzX2h5YnJpZA"
                        alt="Motivation"
                        className="rounded-lg shadow-md"
                    />
                </div>
            </div>

            {/* Problem Statement Section */}
            <div
                className="bg-gray-100 p-6 rounded-xl shadow-md flex flex-col md:flex-row items-center gap-2"
                data-aos="fade-left"
                data-aos-duration="1000"
            >
                <div className="md:w-1/2 flex justify-center mt-4 md:mt-0 order-2 md:order-1">
                    <img
                        src="https://imgs.search.brave.com/A3QDf_CQebxRwOzqt_1JMc7sWfbzkq1niZlzB1XvsYc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5Lzg0LzE4LzQ4/LzM2MF9GXzk4NDE4/NDg0NF9GNFZrV1Mw/NjBFekVwdlZMdkNu/V0gzSXpqa2lSbEts/ZC5qcGc"
                        alt="Problem"
                        className="rounded-lg shadow-md"
                    />
                </div>
                <div className="md:w-1/2 text-lg text-gray-700 font-medium order-1 md:order-2">
                    <h2 className="text-2xl font-bold mb-3">
                        Too Many Tabs, Too Little Sense
                    </h2>
                    <p>
                        So you wanna get smarter but end up lost in a sea of
                        random thoughts? Even if you pick a topic, finding an
                        article that isn’t a snoozefest is another nightmare.
                        Let’s be real—no one’s reading those tiny-font academic
                        papers anymore. Lucky for you, we’re here to save your
                        brain from getting any more useless than it already is.
                    </p>
                </div>
            </div>

            {/* Solution Section */}
            <div
                className="bg-gray-100 p-6 rounded-xl shadow-md flex flex-col md:flex-row items-center"
                data-aos="fade-right"
                data-aos-duration="1000"
            >
                <div className="md:w-1/2 text-lg text-gray-700 font-medium">
                    <h2 className="text-2xl font-bold mb-3">
                        Saving Your Brain, One Article at a Time
                    </h2>
                    <p>
                        You want to learn cool stuff without feeling like you’re
                        back in school, right? We handpick bite-sized, actually
                        fun-to-read articles that get you from “What even is
                        this?” to “Oh, I totally get it” in minutes. No complex
                        jargon, no mind-numbing textbooks—just good content that
                        makes you smarter without the headache.
                    </p>
                </div>
                <div className="md:w-1/2 flex justify-center mt-4 md:mt-0 gap-2">
                    <img
                        src="https://imgs.search.brave.com/uSgM5iSOnZWoz0qrn08-YotMKd_3DdZPWQuU3WMr6O0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzk1LzExLzI3/LzM2MF9GXzk1MTEy/Nzk5X0h0M3AxSTM2/dzBuWDhPbWtKd2dC/Z3A3RDExMEdnS25u/LmpwZw"
                        alt="Solution"
                        className="rounded-lg shadow-md"
                    />
                </div>
            </div>
        </div>
    );
}

export default LandingPageContent;
