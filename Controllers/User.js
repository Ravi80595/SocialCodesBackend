import User from "../Models/User.js"


// ........................... User Get Method ...............................

export const getUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (err) {
        console.log(err)
    }
}

// ........................... User Details update Method ...............................

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const {firstName,lastName,bio}=req.body
        console.log(id,req.body)
        const newUser = await User.findByIdAndUpdate({ _id: id }, {
            firstName:firstName,
            lastName:lastName,
            bio:bio
        })
        res.status(200).json(newUser)
    } catch (err) {
        console.log(err)
    }
}


// ........................... User Search Method ...............................

export const searchUser=async(req,res)=>{
    const params=req.params.id
    try{
        const users= await User.find({username:{$regex:req.params.id}})
        res.send(users)
    }catch (err) {
        console.log(err)
    }
}

// ........................... User Follow Method ...............................

export const follow=async(req,res)=>{
    const { followerId, followingId } = req.body;
      try {
        const follower = await User.findById(followerId);
        const following = await User.findById(followingId);
        if (!follower || !following) {
          return res.status(404).send('User not found');
        }
        if (follower.following.includes(followingId)) {
          return res.status(400).send({"msg":'Already following user'});
        }
        // Add follow request to the following user's pendingFollowRequests array
        following.pendingFollowRequests.push(followerId);
        await following.save();
        res.send({"msg":'Follow request sent'});
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
      }
}


export const followApprove=async(req,res)=>{
    const { id } = req.params;
      const { followerId } = req.body;
      console.log(followerId)
      try {
        const user = await User.findById(id);
        if (!user) {
          return res.status(404).send('User not found');
        }
        if (!user.pendingFollowRequests.includes(followerId)) {
          return res.status(400).send('No pending follow request from user');
        }
        // Add follower to the user's followers array
        user.followers.push(followerId);
        // Remove follower from the user's pendingFollowRequests array
        // user.pendingFollowRequests.remove(followerId);
        user.pendingFollowRequests=user.pendingFollowRequests.filter((id)=>id!==followerId)
        const follower = await User.findById(followerId);
        // Add user to the follower's following array
        follower.following.push(id);
        await user.save();
        await follower.save();
        res.send('Follow request approved');
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
      }
}

export const followReject=async(req,res)=>{
    const { id } = req.params;
      const { followerId } = req.body;
      try {
        const user = await User.findById(id);
        if (!user) {
          return res.status(404).send('User not found');
        }
        if (!user.pendingFollowRequests.includes(followerId)) {
          return res.status(400).send('No pending follow request from user');
        }
        // Remove follower from the user's pendingFollowRequests array
        user.pendingFollowRequests.pull(followerId);
        await user.save();
        res.send({"msg":'Follow request rejected'});
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
      }
}

// ........................... Request List Get Method ...............................

export const getUserRequests = async (req, res) => {
  try {
      const { id } = req.params
      const user = await User.findById(id)
      const friends = await Promise.all(
          user.pendingFollowRequests.map((id) => User.findById(id))
      )
      const formatedFriends = friends.map(
          ({ _id, firstName, lastName, location,email,username,bio,following }) => {
              return { _id, firstName, lastName, location,email,username,bio,following}
          }
      );
      res.status(200).json(formatedFriends)
  }
  catch (err) {
      console.log(err)
  }
}


// app.post('/follow/:id/reject', async (req, res) => {
//   const { id } = req.params;
//   const { followerId } = req.body;
//   try {
//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(404).send('User not found');
//     }
//     if (!user.pendingFollowRequests.includes(followerId)) {
//       return res.status(400).send('No pending follow request from user');
//     }
//     // Remove follower from the user's pendingFollowRequests array
//     user.pendingFollowRequests.pull(followerId);
//     await user.save();
//     res.send('Follow request rejected');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Internal server error');
//   }
// });






