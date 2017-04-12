const db = require('./database/database');
const fs = require('fs');
const {buffer, text, json} = require('micro');

const helpPage = fs.readFileSync('./help.html', 'utf-8');
const addStoryboardPage = fs.readFileSync('./add_story.html', 'utf-8');
const storyboardEditPage = fs.readFileSync('./edit_story.html', 'utf-8');

function urldecode(str) {
   return decodeURIComponent((str+'').replace(/\+/g, ' '));
}

function isValidInteger(str) {
   var intRegex = /^\d+$/;
   if(intRegex.test(str)) {
      return true;
   }

   return false;
}

const help = async() => {
   return helpPage;
}

const listStoryboards = async ({ body }) => {
   try {
      console.log("Listing all storyboards...");
      var res = await db.query('select * from storyboards order by _id');
      return res.rows;
   }
   catch(err) {
      console.error('Error running query', err)
   }
}

const getStoryboard = async ({ params: { id } }) => {
   if(isValidInteger(id)) {
      var res = await db.query("select * from storyboards where _id = " + id);
      console.log('Details of story id [' + id + ']');
      return res.rows;
   }

   return helpPage;
};

const showAddStoryForm = async ({ req, res }) => {
   try {
      console.log('Showing add story form for method [' + req.method + ']');

      const js = await json(req);
      console.log(js);

   }
   catch(err) {
      console.error('Could not parse _something_...');
   }


   return fs.readFileSync('./add_story.html', 'utf-8');
}

const addStoryboard = async ({ req, res }) => {
   try {
      const params = await json(req);
      name = params.name;
      desc = params.desc;
      console.log('Adding new storyboard with name [' + name + '] and desc [' + desc + ']');
      var res = await db.query("insert into storyboards(name, description) values('" + name + "', '" + desc + "')");
      return res;
   }
   catch(err) {
      console.error('Error running query', err);
   }
}

const showStoryboardForm = async ({ params: { id } }) => {
   var res = await db.query("select * from storyboards where _id = " + id);
   if(res.rows.length > 0) {
      var story = res.rows[0];
      return storyboardEditPage
         .replace(new RegExp('STORY_ID', 'g'), id)
         .replace('STORY_NAME', story.name)
         .replace('STORY_DESC', story.description);
   }

   return "No storyboard found with id [" +id + "].";
}

const updateStoryboard = async ({ req, res, params: { id } }) => {
   console.log("Edit storyboard request for [" + id + "]")
   if(isValidInteger(id)) {
      const { name, desc } = await json(req);
      console.log('Changing name to [' + name + ']');
      console.log('Changing desc to [' + desc + ']');
      var res = await db.query("update storyboards set name = '" + name + "', description = '" + desc + "' where _id = " + id);
      return res;
   }

   return helpPage;
}

const deleteStoryboard = async( {params: { id } }) => {
   if(isValidInteger(id)) {
      var res_scenes = await db.query("delete from scenes where storyboard_id = " + id);
      var res_story = await db.query("delete from storyboards where _id = " + id);
      console.log("Deleted storyboard [" + id + "] and ALL ASSOCIATED SCENES..");
      return { res_scenes, res_story };
   }

   return helpPage;
}

module.exports = { help, listStoryboards, getStoryboard, addStoryboard, updateStoryboard, deleteStoryboard, showAddStoryForm, showStoryboardForm };
