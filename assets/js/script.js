let teamShoestation;

const getCardMemberHtml = (member, index) => {
    return `
        <div class="ts-member-card ts-member-card-${index % 2 === 0 ? 'right' : 'left'}">
            <h2 class="ts-member-card-header">${member.name}</h2>
            <h3 class="ts-member-card-subtitle">
                ${member.titles.length > 0 ?
            `<div>${member.titles.map(title => title.text).join('</div><div>')}</div>` : ``
        }
            </h3>
            <img class="ts-member-card-photo" src="${member.image}" alt="">
            <div class="ts-member-card-cut"></div>
        </div>
    `
}

const renderMainMembers = members => {
    let html = ``;
    members.forEach((member, i) => {
        html += getCardMemberHtml(member, i);
    });
    document.getElementById('ts-main-members').innerHTML = html;
}

const renderMembers = members => {
    let html = ``;
    members.forEach((member, i) => {
        html += `
            <div class="member" data-member-id="${member.id}" onclick="selectMember(this, ${member.id})">
                <img src="${member.avatar}">
            </div>
        `;
    });
    document.getElementById('members-list').innerHTML = html;
}

const selectMember = (el, memberId) => {
    const member = teamShoestation.members.find(m => m.id === memberId);
    for (const e of document.getElementsByClassName('member')) {
        e.classList.remove('member-active');
    }
    if (member) {
        const html = getCardMemberHtml(member, 1);
        document.getElementById('member-selected').innerHTML = html;
        el.classList.add('member-active');
    }
}

(async () => {
    try {
        const response = await fetch('assets/js/team-shoestation.json');
        teamShoestation = await response.json();
        renderMainMembers(teamShoestation.mainMembers);
        renderMembers(teamShoestation.members);
        selectMember(document.querySelector(`[data-member-id="${teamShoestation.members[0].id}"]`), teamShoestation.members[0].id);
    } catch (error) {
        console.log(error)
    }
})()