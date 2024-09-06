var HDD = {
    cart : {
        add : function (pid, qty, btnObj, reloadPage) {
            if(btnObj){
                $(btnObj).attr("disabled", true);
            }
            var data  = {
                product_id : pid,
                qty : qty,
                _token : $('meta[name="_csrf"]').attr('content')
            };
            let self = this;
            $.ajax({
                dataType: "json",
                data: data,
                type: "post",
                url: "/checkout/cart/add",
                success: function (response) {
                    $(btnObj).attr("disabled", false);
                    if (response.status) {
                        if(response.status == 1){
                            //HDD.showModal('SUCCESS !!', 'Cart updated successfully');
                            HDD.shoeToast('success', 'Cart updated successfully');
                            self.updateMiniCart((response.data.content) ? response.data.content : '', (response.data.item_count) ? response.data.item_count : '', (response.data.list_content) ? response.data.list_content : '')
                            if(reloadPage){
                                window.location.reload();
                            }else{

                            }
                        }else{
                            HDD.shoeToast('error', response.msg);
                            //HDD.showModal('ERROR !!', response.msg);
                        }
                        //window.location = "/checkout/onepage";
                    } else {
                        HDD.shoeToast('error', 'Please try again');
                        //HDD.showModal('ERROR !!', 'Please try again');
                    }
                }
            });
        },
        removeItem : function (pid, btnObj,reloadPage) {
            if(btnObj){
                $(btnObj).attr("disabled", true);
            }
            var data  = {
                product_id : pid,
                _token : $('meta[name="_csrf"]').attr('content')
            };
            let self = this;
            $.ajax({
                dataType: "json",
                data: data,
                type: "post",
                url: "/checkout/cart/remove",
                success: function (response) {
                    if(btnObj){
                        $(btnObj).attr("disabled", false);
                    }

                    if (response.status) {
                        if(response.status == 1){
                            HDD.shoeToast('success', 'Cart updated successfully');
                            //HDD.showModal('SUCCESS !!', 'Cart updated successfully');
                            self.updateMiniCart((response.data.content) ? response.data.content : '', (response.data.item_count) ? response.data.item_count : '', (response.data.list_content) ? response.data.list_content : '');
                            window.location.reload();
                        }else{
                            HDD.shoeToast('error', response.msg);
                            //HDD.showModal('ERROR !!', response.msg);
                        }
                        //window.location = "/checkout/onepage";
                    } else {
                        HDD.shoeToast('error', 'Please try again');
                        //HDD.showModal('ERROR !!', 'Please try again');
                    }
                }
            });
        },

        updateMiniCart : function(content, item_count, list){
            $('ul.top-right-list').find('span.mini-cart').html(content)
            $('ul.top-right-list').find('span.cart-item-count').html(item_count)
            $('div.cart-box-wrapper').html(list)
        },


    },
    changeUrl(page, url) {
        if (typeof (history.pushState) != "undefined") {
            var obj = { Page: page, Url: url };
            history.pushState(obj, obj.Page, obj.Url);
        } else {
            alert("Browser does not support HTML5.");
        }
    },
    addInQuickList : function (pid, btnObj,reloadPage) {
        if(btnObj){
            $(btnObj).attr("disabled", true);
        }
        var data  = {
            product_id : pid,
            _token : $('meta[name="_csrf"]').attr('content')
        };
        let self = this;
        $.ajax({
            dataType: "json",
            data: data,
            type: "post",
            url: "/customer/add-quick-list",
            success: function (response) {
                if(btnObj){
                    $(btnObj).attr("disabled", false);
                }
                if (typeof response.status !== 'undefined') {
                    if(response.status == 1){
                        HDD.shoeToast('error', response.msg);
                        //HDD.showModal('SUCCESS !!', response.msg);
                    }else{
                        HDD.shoeToast('error', response.msg);
                        //HDD.showModal('ERROR !!', response.msg);
                    }
                } else {
                    HDD.shoeToast('ERROR !!', 'Please try again');
                    //HDD.showModal('ERROR !!', 'Please try again');
                }
            }
        });
    },
    showModal(heading, body, type){
        this.hideModal();
        $('div#general-modal').find('.general-modal-heading').html(heading);
        $('div#general-modal').find('.general-modal-body').html(body);
        $('div#general-modal').modal('show');
    },
    hideModal(){
        $('div#general-modal').modal('hide');
    },
    shoeToast(type, message){
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
        switch (type){
            case 'error':
                toastr["error"](message)
                break;
            case 'success':
                toastr["success"](message)
                break;

        }



    }
}
