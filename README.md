# innovation-edge-bot
>🤖 🕶 Innovation Edge's Cisco Spark bot that fetches pokemon, projects, news, answers questions, and more! Edit

Cisco Spark is powerful communication tool for empowering collaboration among teams within a global space or business. To illustrate the power of chatbots, we've created our own personal assitant, the `innovation-edge-bot`! It also has natural language understanding so you can freely ask it many things, here are some sample phrases:

- "I want to learn more about innovation edge"
- "Tell me more about you guys"
- "What are you guys working on?"
- "Show me your projects."
- "Simon Says, `<statement>`"
- "How long have you been up?"
- "Do you know any pokemon?"
- "Show me news for `<news topic>`"
- "What's happening in `<news topic>`?"

To use our bot, message **innovation-edge@sparkbot.io** on [Cisco Spark](https://www.ciscospark.com/)

## Technical Insights
`innovation-edge-bot` is using Node.js and built with Botkit. It uses [Wit.ai](http://wit.ai) for Natural Language Processing and Understanding.

### Directory Structure
This repository is built off of [Howdy.ai's `botkit-starter-ciscospark`](https://github.com/howdyai/botkit-starter-ciscospark) with a few minor revisions

```
+ Existing Starter Files
├── process                 # Dynamically process intents and run associated files: <intent_name>.js
├── libs                    # Additional scripts for processing
├── store                   # A singleton cache reference
└── WitAiData.zip           # Wit.ai Training Data
```
### NLP/NLU Training Data
You can download and import the training data for Wit.ai with the [`WitAiData.zip`](https://github.com/cisco-ie/innovation-edge-bot/blob/master/WitAiData.zip).

## Skills
`innovation-edge-bot` contains various skills that can be a great reference point for creating your own bots. 

**Available Skills:**
- [Display Projects](#Display-Projects)
- [FAQs](#Answer-Frequently-Asked-Questions)
- [News](#News)
- [Pokemon](#Pokemon)
- [Simon Says](#Simon-Says)
- [Uptime](#Uptime)

### Display Projects
Displays projects based on categories of *(Completed / Active / Potential / Inactive)* that is processed from a SmartSheet.

#### Example Triggers:
- `Can you show me projects?`
- `Show me projects?`

<img src="https://user-images.githubusercontent.com/6020066/35170276-80ea05ee-fd14-11e7-83dd-7b8c94745207.png" height="150">

### Answer Frequently Asked Questions
Provides commonly asked questions regarding the Innovation Edge team, and provide associated answers.

#### Example Triggers:
- `I want to learn more about IE`
- `Can you tell me more?`

<img src="https://user-images.githubusercontent.com/6020066/35170421-145c85cc-fd15-11e7-8e4b-abbd18938fdd.png" height="150">

### News
Fetches the latest Google RSS feed and parses it per user search `<NEWS_QUERY>` and display up to **3** relevant articles.

#### Example Triggers:
- `Tell me what's happening in <NEWS_QUERY>`
- `Show me news in <NEWS_QUERY>`

<img src="https://user-images.githubusercontent.com/6020066/35170381-dc8d68f0-fd14-11e7-85db-4c687437e6ec.png" height="250">

### Pokemon
Performs an API call to `pokeapi.com` and fetches a random Pokemon. The bot will respond with a sprite, and common stats.

#### Example Triggers:
- `Can you show me a pokemon?`
- `What pokemon do you know?`

<img src="https://user-images.githubusercontent.com/6020066/35170402-fb04b6b2-fd14-11e7-85e9-2e318a1045a7.png" height="150">

### Simon Says
Attempts to find the `<REPEAT_PHRASE>` and repeats it.

#### Example Triggers:
- `Repeat after me <REPEAT_PHRASE>`
- `Simon Says <REPEAT_PHRASE>`

<img src="https://user-images.githubusercontent.com/6020066/35248080-a18ff60e-ff81-11e7-9bbb-852effe9be1b.png" height="150">

### Uptime
Displays the time the bot has been running, combined with an emoji to express its energy levels.

#### Example Triggers:
- `How long have you been up?`
- `Current uptime?`

<img src="https://user-images.githubusercontent.com/6020066/35248934-d6aba452-ff84-11e7-832c-6e3bda2abb9b.png">

## Questions
You can message brhim@cisco.com or submit an issue for additional information.

## License
MIT © Cisco Innovation Edge 
