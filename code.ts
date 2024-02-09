"use strict";

figma.showUI(__html__);


figma.ui.resize(500,400);


figma.ui.onmessage = async (msg: { type: string; name: string; email: string; posts: string; following: string; followers: string; darkModeSet: boolean; numberOfCards: number }) => {
  if (msg.type === 'create-card') {
    console.log(msg.numberOfCards);
      for(let i = 0; i < msg.numberOfCards; i++){
        await createCard(msg);
    }
  }

  // Close the plugin
  figma.closePlugin();
};




async function createName(msg: { name: string }, mode: boolean, fontName: FontName, colorText: RGB) {
  // Create text node for the name
  const nameText: TextNode = figma.createText();
  nameText.fontName = fontName;
  nameText.characters = msg.name; // Set the text for the name
  nameText.fontSize = 12; // Set font size
  nameText.fills = [{ type: 'SOLID', color: colorText }]; // Set the name text color to #686868

  return nameText;
}


async function createEmail(msg: { email: string}, fontName: FontName){
// Create text node for the email
  const emailText: TextNode = figma.createText();
  emailText.fontName = fontName;
  emailText.characters = msg.email; // Set the text for the email
  emailText.fontSize = 6; // Set font size
  emailText.fills = [{ type: 'SOLID', color: { r: 120/255, g: 120/255, b: 120/255 } }]; // Set the email text color to #686868
  return emailText;
}


async function createCircle(){
  const circle: EllipseNode = figma.createEllipse();
   circle.resize(40, 40); // Set the desired size of the circle
   circle.fills = [{
     type: 'GRADIENT_LINEAR',
     gradientStops: [
       // Start color: blue
       { color: { r: 0, g: 0, b: 1, a: 1 }, position: 0 },
       // End color: green
       { color: { r: 0, g: 1, b: 0, a: 1 }, position: 1 }
     ],
     // This example uses the default gradient transform, which will create a left-to-right gradient.
     // Adjust the gradientTransform matrix to change the angle if needed.
     gradientTransform: [[0, 1, 0], [-1, 0, 1]]
   }];

   return circle;
}


async function createPostsText(msg: { posts: string }, fontName: FontName, colorText: RGB){
  const postsText: TextNode = figma.createText();
  postsText.fontName = fontName;
  postsText.characters = `${msg.posts}`;
  postsText.fontSize = 7; // Set font size
  postsText.fills = [{ type: 'SOLID', color: colorText}];

  return postsText;
}



async function createFollowingText(msg: { following: string }, fontName: FontName, colorText: RGB){
  const followingText: TextNode = figma.createText();
  followingText.fontName = fontName;
  followingText.characters = `${msg.following}`;
  followingText.fontSize = 7; // Set font size
  followingText.fills = [{ type: 'SOLID', color: colorText}];

  return followingText;
}



async function createFollowersText(msg: { followers: string }, fontName: FontName, colorText: RGB){
  const followersText: TextNode = figma.createText();
  followersText.fontName = fontName;
  followersText.characters = `${msg.followers}`;
  followersText.fontSize = 7; // Set font size
  followersText.fills = [{ type: 'SOLID', color: colorText}];

  return followersText;
}



async function createPostLabel(fontName: FontName){
  const postsLabel: TextNode = figma.createText();
  postsLabel.fontName = fontName;
  postsLabel.characters = "Posts";
  postsLabel.fontSize = 4; // Set font size for label
  postsLabel.fills = [{ type: 'SOLID', color: { r: 120/255, g: 120/255, b: 120/255 } }];

  return postsLabel;
}


async function createFollowingLabel(fontName: FontName){
  const followingLabel: TextNode = figma.createText();
  followingLabel.fontName = fontName;
  followingLabel.characters = "Following";
  followingLabel.fontSize = 4; // Set font size for label
  followingLabel.fills = [{ type: 'SOLID', color: { r: 120/255, g: 120/255, b: 120/255 } }];

  return followingLabel;

}


async function createFollowersLabel(fontName: FontName){
  const followersLabel: TextNode = figma.createText();
  followersLabel.fontName = fontName;
  followersLabel.characters = "Followers";
  followersLabel.fontSize = 4; // Set font size for label
  followersLabel.fills = [{ type: 'SOLID', color: { r: 120/255, g: 120/255, b: 120/255 } }];

  return followersLabel;

}


async function createCard(msg: {
  name: string;
  email: string;
  posts: string;
  following: string;
  followers: string;
  darkModeSet: boolean;
}) {

   const mode: boolean = msg.darkModeSet;


   const colorText = mode
   ? { r: 0.98, g: 0.98, b: 0.98 } // Light color
   : { r: 0.2, g: 0.2, b: 0.2 }; // Dark color


  // Create rectangle
   const rect = await createRectangle(msg, mode);   

   


   // Load the "Poppins Medium" font before creating text nodes
   const fontName: FontName = { family: "Poppins", style: "Medium" };
   await figma.loadFontAsync(fontName);
   
   const fontName1: FontName = { family: "Poppins", style: "SemiBold" };
   await figma.loadFontAsync(fontName1);



   const nameText = await createName(msg, mode, fontName, colorText);


   const emailText = await createEmail(msg, fontName);
   
   
   const circle = await createCircle();
   

   // Position the circle above the name text, centered horizontally on the card
   circle.x = rect.x + (rect.width / 2) - (circle.width / 2);
   circle.y = nameText.y - circle.height + 20;
   // Append the text nodes and ellipse to the canvas to compute their width and position them
   figma.currentPage.appendChild(nameText);
   figma.currentPage.appendChild(emailText);
   figma.currentPage.appendChild(circle);

   // Center the name text and ellipse horizontally within the rectangle
   nameText.x = rect.x + (rect.width / 2) - (nameText.width / 2);
   // Position the name text and ellipse vertically
   nameText.y = rect.y + (rect.height / 2) - nameText.height / 1.5; // Center name vertically

   // Position the email text just below the name text
   emailText.x = rect.x + (rect.width / 2) - (emailText.width / 2);
   emailText.y = nameText.y + nameText.height - 3; // Adjusted for spacing
   // Create text node for the 'Posts' label and value


   const postsText = await createPostsText(msg, fontName, colorText);

   const followingText = await createFollowingText(msg, fontName, colorText);
  
   const followersText = await createFollowersText(msg, fontName, colorText);

   figma.currentPage.appendChild(postsText);
   figma.currentPage.appendChild(followingText);
   figma.currentPage.appendChild(followersText);
   

   postsText.x = rect.x + 20;
   postsText.y = emailText.y + emailText.height + 15;
   postsText.fontName = fontName1;

   followingText.x = rect.x + (rect.width / 2) - (followingText.width / 2);
   followingText.y = emailText.y + emailText.height + 15;
   followingText.fontName=fontName1;

   followersText.x = rect.x + rect.width - followersText.width - 20; // Adjust for padding
   followersText.y = emailText.y + emailText.height + 15; // Adjust for spacing
   followersText.fontName=fontName1;



   const postsLabel = await createPostLabel(fontName);



   const followingLabel = await createFollowingLabel(fontName);



   const followersLabel = await createFollowersLabel(fontName);


   // Append the label text nodes to the canvas to compute their width
   figma.currentPage.appendChild(postsLabel);
   figma.currentPage.appendChild(followingLabel);
   figma.currentPage.appendChild(followersLabel);

   // Position the 'Posts' label text under the 'Posts' value
   postsLabel.x = postsText.x + (postsText.width / 2) - (postsLabel.width / 2);
   postsLabel.y = postsText.y + postsText.height; // Adjust for spacing

   // Position the 'Following' label text under the 'Following' value
   followingLabel.x = followingText.x + (followingText.width / 2) - (followingLabel.width / 2);
   followingLabel.y = followingText.y + followingText.height; // Adjust for spacing

   // Position the 'Followers' label text under the 'Followers' value
   followersLabel.x = followersText.x + (followersText.width / 2) - (followersLabel.width / 2);
   followersLabel.y = followersText.y + followersText.height; // Adjust for spacing

   // Group all elements together
   const group: GroupNode = figma.group([rect, nameText, emailText, postsText, followingText, followersText, postsLabel, followingLabel, followersLabel, circle], figma.currentPage);
   group.name = "User Card";
   
   
   // Select the group and focus the view on it
   figma.currentPage.selection = [group];
   figma.viewport.scrollAndZoomIntoView([group]);
}



async function createRectangle(msg: {darkModeSet: boolean}, mode: boolean){
  // Create rectangle
  const rect: RectangleNode = figma.createRectangle();
  rect.resize(230, 100); // Set the desired size of the rectangle
  // Define the color based on the mode
  const color = mode
  ? { r: 0.2, g: 0.2, b: 0.2 } // Dark color
  : { r: 0.98, g: 0.98, b: 0.98 }; // Light color

// Set the fills property of the rect object using the ternary operator
  rect.fills = [{ type: 'SOLID', color }]; // A light gray color for the rectangle
  rect.cornerRadius = 4;
  //giving rectangle shadow
  rect.effects = [
    {
      type: 'DROP_SHADOW',
      color: { r: 0, g: 0, b: 0, a: 0.25 },
      offset: { x: 0, y: 2 },
      radius: 4,
      visible: true,
      blendMode: 'NORMAL',
    },
  ];
  return rect;
}
