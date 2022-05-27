import bcrypt from 'bcrypt';

const users = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: true,
      defaultValue: DataTypes.UUIDV4
    },
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSo7WfE6wFfdpeFph92LdEFJFnula0ecIObiQ&usqp=CAU'
    },
    dob: {
      type: DataTypes.DATE,
    },
    location: {
      type: DataTypes.STRING,
    },
    passwordResetToken: {
      type: DataTypes.STRING
    },
    resetPasswordExpire: {
      type: DataTypes.BIGINT
    },
    googleId: {
      type: DataTypes.STRING
    },
    googleAccessToken: {
      type: DataTypes.STRING
    },
    facebookId: {
      type: DataTypes.STRING
    },
    facebookAccessToken: {
      type: DataTypes.STRING
    },
    activeAsUser: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });

  Users.associate = (models) => {
    // association goes here
  };

  Users.beforeSave((user) => {
    user.password = user.password ? bcrypt.hashSync(user.password, 8) : null;
  });

  Users.checkPassword = (password, user) => bcrypt.compareSync(password, user.password);

  return Users;
};

export default users;
