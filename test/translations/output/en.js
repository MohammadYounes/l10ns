if( typeof define !== "function" ) {
  var define = require( "amdefine" )( module );
}
define(function() {
  var t = {
    "It can have an if and else statement": function anonymous(it) {
      if( it.number > 1 ) {
        return "Number is " + it.number + "";
      }
      else {
        return "Number is smaller than 2";
      }
    },
    "It can have an if and else if and else statements": function anonymous(it) {
      if( it.number < 2 ) {
        return "Number is " + it.number + "";
      }
      else if( it.number < 1 ) {
        return "Number is " + it.number + "";
      }
      else {
        return "Yes it can";
      }
    },
    "It can have only one string": function anonymous(it) {
      return "Yes it can";
    },
    "It can take && in if statement": function anonymous(it) {
      if( it.firstname > it.lastname ) {
        return "Hello " + it.firstname + " " + it.lastname + "!";
      }
      else {
        return "Number is smaller than 2";
      }
    },
    "It can take || in if statement": function anonymous(it) {
      if( it.firstname === "Tingan" || it.lastname === "Ho" ) {
        return "Hello " + it.firstname + " " + it.lastname + "!";
      }
      else {
        return "Firstname and last is not Tingan Ho";
      }
    },
    "It can take several && in if statement": function anonymous(it) {
      if( it.firstname === "Tingan" && it.lastname === "Ho" && it.lastname === "Ho" ) {
        return "Hello " + it.firstname + " " + it.lastname + "!";
      }
      else {
        return "Firstname and last is not Tingan Ho";
      }
    },
    "It can take several || in if statement": function anonymous(it) {
      if( it.firstname === "Tingan" || it.lastname === "Ho" || it.lastname === "Ho" ) {
        return "Hello " + it.firstname + " " + it.lastname + "!";
      }
      else {
        return "Firstname and last is not Tingan Ho";
      }
    },
    "Translation vars can be in one object literal": function anonymous(it) {
      return "yes it can";
    },
    "Translation vars can have one line object literal": function anonymous(it) {
      return "yes it can";
    },
    "Translation vars can have multi-line": function anonymous(it) {
      return "HASH_NOT_TRANSLATED: Translation vars can have multi-line";
    },
    "Translation vars have dot notation": function anonymous(it) {
      return "yes it can";
    },
    "It can have <>": function anonymous(it) {
      return "yes it can";
    },
    "It can have ..": function anonymous(it) {
      return "yes it can";
    },
    "It can have ,,": function anonymous(it) {
      return "HASH_NOT_TRANSLATED: It can have ,,";
    },
    "It can have ::": function anonymous(it) {
      return "yes it can";
    },
    "It can have ;;": function anonymous(it) {
      return "yes it can";
    },
    "It can have ’’": function anonymous(it) {
      return "yes it can";
    },
    "It can have __": function anonymous(it) {
      return "yes it can";
    },
    "It can have &&": function anonymous(it) {
      return "yes it can";
    },
    "It can have %%": function anonymous(it) {
      return "yes it can";
    },
    "It can have $$": function anonymous(it) {
      return "yes it can";
    },
    "It can have €€": function anonymous(it) {
      return "yes it can";
    },
    "It can have ##": function anonymous(it) {
      return "yes it can";
    },
    "It can have ??": function anonymous(it) {
      return "yes it can";
    },
    "It can have !!": function anonymous(it) {
      return "yes it can";
    },
    "It can have ()": function anonymous(it) {
      return "yes it can";
    },
    "It can have @@": function anonymous(it) {
      return "yes it can";
    },
    "It can have ^^": function anonymous(it) {
      return "yes it can";
    },
    "It can have ´´": function anonymous(it) {
      return "yes it can";
    },
    "It can have ``": function anonymous(it) {
      return "yes it can";
    },
    "It can have ==": function anonymous(it) {
      return "yes it can";
    },
    "It can have ++": function anonymous(it) {
      return "yes it can";
    },
    "It can have --": function anonymous(it) {
      return "yes it can";
    },
    "It can have **": function anonymous(it) {
      return "yes it can";
    },
    "It can have //": function anonymous(it) {
      return "yes it can";
    },
    "It can have '": function anonymous(it) {
      return "yes it can";
    },
    "It can have \"": function anonymous(it) {
      return "yes it can";
    },
    "Edit me": function anonymous(it) {
      return "Helloworld";
    },
    "Grunt-translate can have tailing comments": function anonymous(it) {
      return "yes it can";
    },
    "Grunt-translate can have tailing comments with translation vars": function anonymous(it) {
      return "yes it can";
    },
    "Grunt-translate can have tailing comments with multi-line translation vars": function anonymous(it) {
      return "yes it can";
    }
  };
  return function(translationKey) {
    if(!(translationKey in t)) {
      console.log("You have used an undefined translation key:" + translationKey);
      return false;
    }
    delete arguments[0];
    if("1" in arguments) {
      arguments[0] = arguments[1];
    }
    delete arguments[1];
    return t[translationKey].apply(undefined, arguments);
  };
});
