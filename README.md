# accedo

This projects implements a video pod cast client. 

## Build & development

1. After getting the repo in a folder run `npm install` in that folder to install the used packages. This step may take some time.

1. Run `bower install` to install Bootstrap and Angular locally.

1. Finally run `grunt` for building the project and `grunt serve` for preview.

## Description & Notes

1. This currently uses the public proxy `rss2json.com` for getting rss feed data in json format.
1. Four different feed urls are already seeded. The implementation allows adding more rss feed urls easily in the code.
1. The app is built with Mobile First principle. 
1. The app uses aria guidelines to allow accessibility interaction, especially the keyboard.
1. The episode list shows the thumbnails. It would show the thumbnail of the video if available. Defaults to image of the feed.

   

