const db = require('./database/database');
const fs = require('fs');

const helpPage = fs.readFileSync('./help.html', 'utf-8');

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

const addStoryboard = async ({ params: { name, desc } }) => {
   name = urldecode(name);
   desc = urldecode(desc);
   console.log('Adding new storyboard with name [' + name + '] and desc [' + desc + ']');
   var res = await db.query("insert into storyboards(name, description) values('" + name + "', '" + desc + "')");
   return res;
}

const updateStoryboard = async ({ params: { id, name, desc } }) => {
   if(isValidInteger(id)) {
      name = urldecode(name);
      desc = urldecode(desc);
      var res = await db.query("update storyboards set name = '" + name + "', description = '" + desc + "' where _id = " + id);
      return res;
   }

   return helpPage;
}

const addStoryboardScene = async ({ params: { sid, name, desc } }) => {
   if(isValidInteger(sid)) {
      name = urldecode(name);
      desc = urldecode(desc);
      console.log('Adding new scene for storyboard [' + sid + '] with name [' + name + '] and desc [' + desc + ']');
      var res = await db.query("insert into scenes(storyboard_id, name, description) values(" + sid + ", '" + name + "', '" + desc + "')");
      return res;
   }

   return helpPage;
}

const getStoryboardScenes = async ({ params: { sid } }) => {
   if(isValidInteger(sid)) {
      var res = await db.query("select * from scenes where storyboard_id = " + sid + ' order by _id');
      console.log("Scenes for storyboard id [" + sid + "]")
      return res.rows;
   }

   return helpPage;
}

const deleteScene = async( { params: { id } }) => {
   if(isValidInteger(id)) {
      var res = await db.query("delete from scenes where _id = " + id);
      console.log("Delete scened id [" + id + "]")
      return res;
   }

   return helpPage;
}

const deleteStory = async( {params: { id } }) => {
   if(isValidInteger(id)) {
      var res_scenes = await db.query("delete from scenes where storyboard_id = " + id);
      var res_story = await db.query("delete from storyboards where _id = " + id);
      console.log("Deleted storyboard [" + id + "] and ALL ASSOCIATED SCENES..");
      return { res_scenes, res_story };
   }

   return helpPage;
}

module.exports = { help, listStoryboards, getStoryboard, addStoryboard, updateStoryboard, addStoryboardScene, getStoryboardScenes, deleteScene, deleteStory };
