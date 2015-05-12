// Namespace declaration
var mm = mm || {};

/**
 * Fireball class that handles moving and animating fireball
 */
mm.Fireball = pulse.Sprite.extend({
    /**
     * Initializes the fireball
     * @param  {object} params parameters for the man
     */
    init : function(params) {
        if(!params) {
            params = {};
        }

        params.src = mm.Fireball.texture;

        this._super(params);

        this.size = {
            width : 32,
            height : 32
        };

        // Override some physical properties.
        this._physics.bodyDef.fixedRotation = true;
        this._physics.bodyDef.allowSleep = true;
        this._physics.fixDef.restitution = 0;

        this._physics.fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
        this._physics.fixDef.shape.SetAsBox(
            (this.size.width - 15) / 2 * pulse.physics.FACTOR,
            (this.size.height - 15) / 2 * pulse.physics.FACTOR);

        this.position = {
            x : params.position.x || 0,
            y : params.position.y || 0
        };

        // Set a frame rate for animations
        var animationFrameRate = 20;
        var _self = this;

        this.textureFrame.width = 32;
        this.textureFrame.height = 32;

        // Save the original frame
        this._private.oframe = {
            x: 0,
            y: 0,
            width : 32,
            height : 32
        };

        // Create animation for fly
        var flyAction = new pulse.AnimateAction({
            name : 'fly',
            size : {width:32, height:32},
            bounds : {x: 2000, y: 60},
            frames : [1, 1],
            frameRate : animationFrameRate
        });

        // Add the animation
        this.addAction(flyAction);


    },

    /**
     * Resets all animations on the man
     */
    reset : function() {
        for(var n in this.runningActions) {
            this.runningActions[n].stop();
        }
    },

    /**
     * Update function that runs on every update loop, we updated positions and
     * check for any change in state to react to it
     * @param  {number} elapsed the time elapsed since last update
     */
    update : function(elapsed) {
        this._super(elapsed);
    },

    /**
     * Updating animations based on change in state
     * @param  {string} state The new state
     */
    updateState : function(state) {
        this.reset();

        switch(state) {
            case mm.Fireball.State.Fly:
                this.textureFrame = this._private.oframe;
                this.updated = true;
                break;
        }
    }

});

// Static member to hold possible states
mm.Fireball.State = {};
mm.Fireball.State.Fly = 'fly';

// Static member to hold possible directions
mm.Fireball.Direction = {};
mm.Fireball.Direction.Right = 1;
mm.Fireball.Direction.Left = -1;

// Static member to hold texture atlas for the man
mm.Fireball.texture = new pulse.Texture({filename: 'fireball.png'});